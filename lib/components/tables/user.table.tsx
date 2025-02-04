"use client";
import { useTransition } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/lib/components/ui/table";
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
            <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Name</TableHead>
            <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Email</TableHead>
            <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Role</TableHead>
            <TableHead className="text-sm font-semibold text-gray-900 whitespace-nowrap">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="text-sm font-medium text-gray-900">{user.name}</TableCell>
              <TableCell className="text-gray-500">{user.email}</TableCell>
              <TableCell className="text-gray-500 capitalize">{user.role}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
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
