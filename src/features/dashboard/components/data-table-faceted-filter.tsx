"use client";

import { Check, ChevronDown, Plus } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DataTableFacetedFilterOption {
  label: string;
  value: string;
  count?: number;
}

interface DataTableFacetedFilterProps {
  /** フィルターのタイトル */
  title?: string;
  /** 選択可能なオプション一覧 */
  options: DataTableFacetedFilterOption[];
  /** 現在選択中の値のセット */
  selected: Set<string>;
  /** 選択変更時のコールバック */
  onSelectedChange: (selected: Set<string>) => void;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * Tasks サンプルと同様のファセットフィルター
 * Popover + Command（検索可能）+ Checkbox でマルチセレクト
 */
export function DataTableFacetedFilter({
  title,
  options,
  selected,
  onSelectedChange,
  className,
}: DataTableFacetedFilterProps) {
  const [open, setOpen] = React.useState(false);

  const handleToggle = (value: string, checked: boolean) => {
    const next = new Set(selected);
    if (checked) {
      next.add(value);
    } else {
      next.delete(value);
    }
    onSelectedChange(next);
  };

  const handleClear = () => {
    onSelectedChange(new Set());
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 border-dashed text-xs",
            selected.size > 0 && "border-solid",
            className,
          )}
        >
          <Plus className="mr-2 size-3" />
          {title}
          {selected.size > 0 && (
            <>
              <div className="h-4 w-px bg-border" />
              <Badge
                variant="secondary"
                className="ml-2 rounded-sm px-1 text-xs font-normal lg:hidden"
              >
                {selected.size}
              </Badge>
              <div className="hidden gap-1 lg:flex">
                {selected.size > 2 ? (
                  <Badge variant="secondary" className="rounded-sm px-1 text-xs font-normal">
                    {selected.size} 件
                  </Badge>
                ) : (
                  options
                    .filter((opt) => selected.has(opt.value))
                    .map((opt) => (
                      <Badge
                        key={opt.value}
                        variant="secondary"
                        className="rounded-sm px-1 text-xs font-normal"
                      >
                        {opt.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
          <ChevronDown className="ml-2 size-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 text-xs" align="start">
        <Command>
          <CommandInput placeholder={`${title}で検索...`} className="h-8 py-2 text-xs" />
          <CommandList>
            <CommandEmpty className="text-xs">該当なし</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleToggle(option.value, !isSelected)}
                    className="py-1.5 text-xs"
                  >
                    <div
                      className={cn(
                        "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      {isSelected ? <Check className="size-3" /> : <Check className="size-3" />}
                    </div>
                    <span>{option.label}</span>
                    {option.count != null && (
                      <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-muted font-mono text-[10px]">
                        {option.count}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
        {selected.size > 0 && (
          <>
            <div className="border-t" />
            <div className="p-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-full justify-center text-xs"
                onClick={handleClear}
              >
                クリア
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
