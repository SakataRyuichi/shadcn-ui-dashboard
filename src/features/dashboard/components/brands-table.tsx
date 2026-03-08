"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBrands } from "../api/use-dashboard-data";
import { DataTableSkeleton } from "./data-table-skeleton";

export function BrandsTable() {
  const { data, isLoading } = useBrands();

  if (isLoading) {
    return <DataTableSkeleton rows={3} columns={4} />;
  }

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>ブランド名</TableHead>
            <TableHead>説明</TableHead>
            <TableHead>登録日</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((brand) => (
            <TableRow key={brand.id}>
              <TableCell className="font-mono text-muted-foreground">{brand.id}</TableCell>
              <TableCell className="font-medium">{brand.name}</TableCell>
              <TableCell className="text-muted-foreground">{brand.description}</TableCell>
              <TableCell>{brand.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
