import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

// Definir el tipo del formulario
interface FormState {
  darkMode: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export default function Example() {
  const [form, setForm] = useState<FormState>({
    darkMode: false,
    pushNotifications: false,
    emailNotifications: true,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Home</Text>

          <Text style={styles.subtitle}>
            Edita tu perfil y modifca a tu gusto!
          </Text>
        </View>

        <ScrollView>
          <View style={styles.profile}>
            <Text style={styles.profileName}>Luis</Text>

            <Text style={styles.profileEmail}>luisrome01@mail.com</Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
            >
              <View style={styles.profileAction}>
                <Text style={styles.profileActionText}>Edit Profile</Text>

                <FeatherIcon color="#fff" name="edit" size={16} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferencias</Text>

            <View style={styles.sectionBody}>
              <View style={styles.rowWrapper}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: "#007AFF" }]}
                  >
                    <FeatherIcon color="#fff" name="moon" size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Dark Mode</Text>

                  <View style={styles.rowSpacer} />

                  <Switch
                    onValueChange={(darkMode) => setForm({ ...form, darkMode })}
                    value={form.darkMode}
                  />
                </View>
              </View>

              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}
                >
                  <View
                    style={[styles.rowIcon, { backgroundColor: "#32c759" }]}
                  >
                    <FeatherIcon color="#fff" name="navigation" size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Location</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>Maracaibo, Vzla</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <View style={styles.row}>
                  <View
                    style={[styles.rowIcon, { backgroundColor: "#38C959" }]}
                  >
                    <FeatherIcon color="#fff" name="at-sign" size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Email Notifications</Text>

                  <View style={styles.rowSpacer} />

                  <Switch
                    onValueChange={(emailNotifications) =>
                      setForm({ ...form, emailNotifications })
                    }
                    value={form.emailNotifications}
                  />
                </View>
              </View>

              <View style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}
                >
                  <View
                    style={[styles.rowIcon, { backgroundColor: "#FE3C30" }]}
                  >
                    <FeatherIcon color="#fff" name="music" size={20} />
                  </View>

                  <Text style={styles.rowLabel}>Sound</Text>

                  <View style={styles.rowSpacer} />

                  <Text style={styles.rowValue}>ON</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text style={styles.contentFooter}>Version 13.0 jaja</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  /** Profile */
  profile: {
    padding: 16,
    marginHorizontal: 24,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 8,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "#090909",
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "400",
    color: "#848484",
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  /** Section */
  section: {
    paddingTop: 12,
  },
  sectionTitle: {
    marginVertical: 8,
    marginHorizontal: 24,
    fontSize: 14,
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  sectionBody: {
    paddingLeft: 24,
    // backgroundColor: "#fff",
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  /** Row */
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 16,
    height: 50,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  rowIcon: {
    width: 30,
    height: 30,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#fff",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    fontWeight: "500",
    color: "#8B8B8B",
    marginRight: 4,
  },
});
