"use client"

import { Rolestype } from "../types/next-auth"

export async function updateSessionWithRole(
  role: Rolestype, 
  update: (data: any) => Promise<any>
) {
  try {
    const newRole = role;
    // Update the session using the passed update function
    const updateSession = await update({ role: newRole });
    console.log("updateSession is this ", updateSession);
    return { success: true }
  } catch (error) {
    console.error("Error updating session:", error)
    return { error: "Failed to update session" }
  }
}

