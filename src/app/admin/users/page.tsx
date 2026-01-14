import { users } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-8">Registered Users</h1>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={`https://i.pravatar.cc/40?u=${user.id}`} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                    </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                    {user.shippingAddress ? `${user.shippingAddress.street}, ${user.shippingAddress.city}` : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
