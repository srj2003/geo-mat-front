// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { FileText, DollarSign, ArrowLeft } from 'lucide-react-native'; // Added ArrowLeft
// import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
// import ExpenseForm from "./expensedetails";
// import ExpenseDetailsScreen from "./expensedetails";

// const ExpenseScreen = () => {
//   const [currentScreen, setCurrentScreen] = useState("");

//   return (
//     <View style={styles.container}>
//       {currentScreen === "" && (
//         <Animated.View 
//           entering={FadeIn.duration(300)} 
//           exiting={FadeOut.duration(300)} 
//           style={styles.welcomeBanner}
//         >
//           <View style={styles.welcomeContent}>
//             <Text style={styles.welcomeText}>Welcome to</Text>
//             <Text style={styles.nameText}>Expense Management</Text>
//             <Text style={styles.welcomeDescription}>
//               Manage your expenses efficiently and keep track of all your transactions
//             </Text>
//           </View>

//           <View style={styles.actionCards}>
//             <TouchableOpacity 
//               style={styles.actionCard}
//               onPress={() => setCurrentScreen("expenseform")}
//             >
//               <DollarSign size={24} color="#6366f1" />
//               <Text style={styles.actionTitle}>Add Expense</Text>
//               <Text style={styles.actionDescription}>
//                 Create a new expense entry
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity 
//               style={styles.actionCard}
//               onPress={() => setCurrentScreen("myExpenses")}
//             >
//               <FileText size={24} color="#6366f1" />
//               <Text style={styles.actionTitle}>My Expenses</Text>
//               <Text style={styles.actionDescription}>
//                 View your expense history
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       )}

//       {currentScreen === "addExpense" && (
//         <Animated.View 
//           entering={FadeIn.duration(300)} 
//           exiting={FadeOut.duration(300)}
//           style={styles.screenContainer}
//         >
//           {/* Back Icon at Top Left Corner */}
//           <View style={styles.topBar}>
//             <TouchableOpacity 
//               style={styles.backIcon} 
//               onPress={() => setCurrentScreen("addExpense")}
//             >
//               <ArrowLeft size={24} color="#374151" />
//             </TouchableOpacity>
//             <Text style={styles.screenTitle}>Add Expense</Text>
//           </View>
//           <ExpenseForm />
//         </Animated.View>
//       )}

//       {currentScreen === "myExpenses" && (
//         <Animated.View 
//           entering={FadeIn.duration(300)} 
//           exiting={FadeOut.duration(300)}
//           style={styles.screenContainer}
//         >
//           {/* Back Icon at Top Left Corner */}
//           <View style={styles.topBar}>
//             <TouchableOpacity 
//               style={styles.backIcon} 
//               onPress={() => setCurrentScreen("")}
//             >
//               <ArrowLeft size={24} color="#374151" />
//             </TouchableOpacity>
//             <Text style={styles.screenTitle}>Expense History</Text>
//           </View>
//           <ExpenseDetailsScreen />
//         </Animated.View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f9fafb",
//   },
//   welcomeBanner: {
//     margin: 16,
//     padding: 24,
//     backgroundColor: "#ffffff",
//     borderRadius: 16,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   welcomeContent: {
//     marginBottom: 24,
//   },
//   welcomeText: {
//     fontSize: 16,
//     color: "#6b7280",
//   },
//   nameText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#111827",
//     marginTop: 4,
//   },
//   welcomeDescription: {
//     fontSize: 16,
//     color: "#6b7280",
//     marginTop: 8,
//     lineHeight: 24,
//   },
//   actionCards: {
//     flexDirection: "row",
//     gap: 16,
//     marginTop: 16,
//   },
//   actionCard: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//     padding: 20,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     alignItems: "center",
//   },
//   actionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#111827",
//     marginTop: 12,
//     marginBottom: 8,
//   },
//   actionDescription: {
//     fontSize: 14,
//     color: "#6b7280",
//     textAlign: "center",
//   },
//   screenContainer: {
//     flex: 1,
//   },
//   topBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#ffffff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#e5e7eb",
//   },
//   backIcon: {
//     marginRight: 16,
//   },
//   screenTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#111827",
//   },
// });

// export default ExpenseScreen;