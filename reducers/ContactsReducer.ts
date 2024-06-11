import { type Contact } from '../interfaces/Contact';

interface ContactsReducer {
  contacts: Contact[]
}

export const contactsReducerInitialState = {
  contacts: [],
}

type ContactsAction = { type: 'SET_CONTACTS', payload: Contact[] } | { type: 'ADD_CONTACT', payload: Contact } | { type: 'UPDATE_CONTACT', payload: Contact } | { type: 'DELETE_CONTACT', payload: string }

export const ContactsReducer = (state = contactsReducerInitialState, action: ContactsAction): ContactsReducer => {
  switch(action.type) {
    case 'SET_CONTACTS': {
      return {
        ...state,
        contacts: [...action.payload]
      }
    }

    case 'ADD_CONTACT': {
      return {
        ...state,
        contacts: [action.payload, ...state.contacts] 
      }
    }

    case 'UPDATE_CONTACT': {
      const copy: Contact[] = [...state.contacts];
      const contactIndex = copy.findIndex((c: Contact) => c.id === action.payload.id);
      if(contactIndex === -1) return state;

      copy[contactIndex] = {...action.payload};

      return {
        ...state,
        contacts: [...copy],
      }
    }

    case 'DELETE_CONTACT': {
      const newArr = state.contacts.filter((c: Contact) => c.id !== action.payload);

      return {
        ...state,
        contacts: [...newArr]
      }
    }

    default:
      return state;
  }
}