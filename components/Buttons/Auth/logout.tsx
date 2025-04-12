import React from "react";
import { Button } from "@rneui/themed";
import { supabase } from "@/lib/supabase/supabase";

export default function LogoutButton() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return <Button title="Logout" onPress={handleLogout} />;
}
