import React from "react";
import { Text } from "react-native";

const checkAccess = (isLogged, currentUserId, requiredUserId) => {
  if (isLogged && currentUserId !== requiredUserId) {
    return ( <Text>Accès non autorisé</Text> )
  } 
}

export { checkAccess }