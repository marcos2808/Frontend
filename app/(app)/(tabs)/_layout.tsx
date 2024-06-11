import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useAuthStore } from "@/store/auth";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { token, doLogout } = useAuthStore();

  return (
    <>
      {token && (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            // Disable the static render of the header on web
            // to prevent a hydration error in React Navigation v6.
            headerShown: useClientOnlyValue(false, true),
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Contactos",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="user" color={color} />
              ),
              headerRight: () => (
                <Link href="/(app)/modalCrear" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FeatherIcon
                        name="plus"
                        size={25}
                        color={Colors[colorScheme ?? "light"].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
            }}
          />
          <Tabs.Screen
            name="Grupos"
            options={{
              title: "Grupos",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="group" color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="Perfil"
            options={{
              title: "Perfil",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="home" color={color} />
              ),

              headerRight: () => (
                <Pressable onPress={doLogout}>
                  {({ pressed }) => (
                    <FeatherIcon
                      name="log-out"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              ),
            }}
          />
        </Tabs>
      )}
    </>
  );
}
