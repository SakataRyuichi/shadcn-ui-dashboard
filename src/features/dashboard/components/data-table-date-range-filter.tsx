"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon, ChevronDown } from "lucide-react";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/** 日付範囲（from/to は任意） */
type DateRangeFilterValue = { from?: Date; to?: Date } | undefined;

interface DataTableDateRangeFilterProps {
  /** フィルターのタイトル */
  title?: string;
  /** 選択中の日付範囲 */
  dateRange: DateRangeFilterValue;
  /** 日付範囲変更時のコールバック */
  onDateRangeChange: (range: DateRangeFilterValue) => void;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * テーブル用の日付範囲フィルター
 * カレンダーで範囲選択可能
 */
export function DataTableDateRangeFilter({
  title = "登録日",
  dateRange,
  onDateRangeChange,
  className,
}: DataTableDateRangeFilterProps) {
  const [open, setOpen] = React.useState(false);

  const handleClear = () => {
    onDateRangeChange(undefined);
    setOpen(false);
  };

  const hasSelection = dateRange?.from != null || dateRange?.to != null;

  const displayText = React.useMemo(() => {
    if (!dateRange?.from && !dateRange?.to) return null;
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "yyyy/MM/dd", { locale: ja })} 〜 ${format(dateRange.to, "yyyy/MM/dd", { locale: ja })}`;
    }
    if (dateRange.from) {
      return `${format(dateRange.from, "yyyy/MM/dd", { locale: ja })} 〜`;
    }
    if (dateRange.to) {
      return `〜 ${format(dateRange.to, "yyyy/MM/dd", { locale: ja })}`;
    }
    return null;
  }, [dateRange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("h-8 border-dashed text-xs", hasSelection && "border-solid", className)}
        >
          <CalendarIcon className="mr-2 size-3" />
          {title}
          {displayText && (
            <>
              <div className="h-4 w-px bg-border" />
              <span className="ml-2 max-w-35 truncate">{displayText}</span>
            </>
          )}
          <ChevronDown className="ml-2 size-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from ?? dateRange?.to ?? new Date()}
          selected={dateRange as DateRange}
          onSelect={(range) => onDateRangeChange(range ?? undefined)}
          numberOfMonths={1}
          captionLayout="dropdown"
          locale={ja}
          className="rounded-lg border"
        />
        {hasSelection && (
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
