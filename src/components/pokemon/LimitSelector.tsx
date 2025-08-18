import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import paginationConfig from "../../config/pagination.config";

export interface LimitSelectorProps {
  currentLimit: number;
  onLimitChange: (limit: number) => void;
}

const LimitSelector: React.FC<LimitSelectorProps> = ({
  currentLimit,
  onLimitChange,
}) => {
  const limitOptions = [
    paginationConfig.minLimit,
    paginationConfig.defaultLimit,
    paginationConfig.defaultLimit * 2,
    paginationConfig.maxLimit,
  ]
    .filter(
      (value, index, array) =>
        array.indexOf(value) === index && value <= paginationConfig.maxLimit
    )
    .sort((a, b) => a - b);

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-600 whitespace-nowrap">Items per page:</span>
      <Select
        value={currentLimit.toString()}
        onValueChange={(value) => onLimitChange(Number(value))}
      >
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {limitOptions.map((option) => (
            <SelectItem key={option} value={option.toString()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LimitSelector;
