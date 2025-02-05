"use client";
import { useTransition } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/lib/components/ui/table";
import { ScrollArea } from "@/lib/components/ui/scroll-area";
import { User } from "@/lib/definitions";
import { deleteUserById } from "@/lib/action";

export function UserTable({ users }: { users: User[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (userId: string) => {
    startTransition(async () => {
      await deleteUserById(userId);
    });
  };

  return (
    <ScrollArea>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="capitalize">{user.role}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="font-semibold text-blue-600 hover:text-blue-500"
                  disabled={isPending}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
