import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { MenusCategories } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface Props {
  title: string;
  selectedMenuCategoryIds: number[];
  setSelectedMenuCategoryIds: Dispatch<SetStateAction<number[]>>;
  items: MenusCategories[];
}

export default function MultipleSelect({
  title,
  selectedMenuCategoryIds,
  setSelectedMenuCategoryIds,
  items,
}: Props) {
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, borderColor: " #8ecae6" }}>
        <InputLabel id="demo-multiple-checkbox-label" sx={{ color: "#023047" }}>
          {title}
        </InputLabel>
        <Select
          sx={{ color: "#023047" }}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedMenuCategoryIds}
          onChange={(e) => {
            const menuCategoryIds = e.target.value as number[];
            setSelectedMenuCategoryIds(menuCategoryIds);
          }}
          input={<OutlinedInput label={title} />}
          renderValue={() => {
            return selectedMenuCategoryIds
              .map((selectedMenuCategoryId) =>
                items.find((item) => item.id === selectedMenuCategoryId)
              )
              .map((item: any) => item.name)
              .join(", ");
          }}
        >
          {items.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <Checkbox checked={selectedMenuCategoryIds.includes(item.id)} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
