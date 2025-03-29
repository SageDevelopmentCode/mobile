import React from "react";
import { Button } from "@rneui/themed";
import { supabase } from "@/lib/supabase";

export default function LogoutButton() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    // No need to navigate manually, the AuthContext will handle redirection
  };

  return <Button title="Logout" onPress={handleLogout} />;
}
