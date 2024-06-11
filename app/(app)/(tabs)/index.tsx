import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userEndpoints } from "@/constants/axiosInstance";

type RootStackParamList = {
  ContactList: undefined;
  ModalEditar: { contactId: string };
};

type ContactListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ContactList",
  "Home"
>;

type Contact = {
  id: string;
  name: string;
  phone: string;
};

const CONTACTS: Contact[] = [
  { id: "1", name: "Luis Romero", phone: "+1 (972) 566-2684" },
  { id: "2", name: "Jose Chacon", phone: "+1 (845) 456-2237" },
  { id: "3", name: "Marcos Vejega", phone: "+1 (959) 422-3635" },
  { id: "4", name: "Jose Mavarez", phone: "+1 (951) 472-2967" },
  { id: "5", name: "Misael Reverol", phone: "+1 (887) 478-2693" },
  { id: "6", name: "Andrea Araujo", phone: "+1 (824) 467-3579" },
  { id: "7", name: "Mario Gonzalez", phone: "+1 (862) 581-3022" },
  { id: "8", name: "Eduardo Garcia", phone: "+1 (913) 497-2020" },
];

type Section = {
  letter: string;
  items: Contact[];
};

export const ContactListScreen: React.FC = () => {
  const [contacts, setContacts] = React.useState<Contact[]>([]);

  const navigation = useNavigation<ContactListScreenNavigationProp>();

  const sections: Section[] = React.useMemo(() => {
    const sectionsMap = CONTACTS.reduce<Record<string, Contact[]>>(
      (acc, item) => {
        const [lastName] = item.name.split(" ").reverse();
        return { ...acc, [lastName[0]]: [...(acc[lastName[0]] || []), item] };
      },
      {}
    );

    return Object.entries(sectionsMap)
      .map(([letter, items]) => ({ letter, items }))
      .sort((a, b) => a.letter.localeCompare(b.letter));
  }, []);

  const handleEditContact = (contactId: string) => {
    navigation.navigate("ModalEditar", { contactId });
  };

  const fetchContacts = async () => {
    try {
      const token =
        (await AsyncStorage.getItem("access-token", (err) => {
          if (err) return "";
        })) || "";

      const res = await fetch(userEndpoints.getUser, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "GET",
      });

      const results: Contact[] = await res.json();

      setContacts((p) => [...results]);
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#f2f2f2", flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Contacts</Text>
        </View>
        {sections.map(({ letter, items }) => (
          <View style={styles.section} key={letter}>
            <Text style={styles.sectionTitle}>{letter}</Text>
            <View style={styles.sectionItems}>
              {items.map(({ id, name, phone }) => (
                <View key={id} style={styles.cardWrapper}>
                  <TouchableOpacity onPress={() => handleEditContact(id)}>
                    <View style={styles.card}>
                      <View style={[styles.cardImg, styles.cardAvatar]}>
                        <Text style={styles.cardAvatarText}>{name[0]}</Text>
                      </View>
                      <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{name}</Text>
                        <Text style={styles.cardPhone}>{phone}</Text>
                      </View>
                      <View style={styles.cardAction}>
                        <FeatherIcon
                          color="#9ca3af"
                          name="chevron-right"
                          size={22}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#d6d6d6",
    marginBottom: 8,
  },
  sectionItems: {
    marginTop: 8,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardImg: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#9ca1ac",
    justifyContent: "center",
    alignItems: "center",
  },
  cardAvatarText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#fff",
  },
  cardBody: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  cardPhone: {
    fontSize: 15,
    color: "#000000",
    marginTop: 4,
  },
  cardAction: {
    marginLeft: "auto",
  },

  cardAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#9ca1ac",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ContactListScreen;
