
import {
  Send,
  ChevronDown,
  Wifi,
  Tv,
  Cable,
  Router,
}  from "lucide-react-native";
export const wireUsage = [
  {
    value: 50,
    label: "Jun 1",
  },
  {
    value: 75,
    label: "Jun 2",
  },
  {
    value: 100,
    label: "Jun 3",
  },
  {
    value: 150,
    label: "Jun 4",
  },
  {
    value: 175,
    label: "Jun 5",
  },
  {
    value: 200,
    label: "Jun 6",
  },
  {
    value: 250,
    label: "Jun 7",
  },
  {
    value: 300,
    label: "Jun 8",
  },
];



export const routerUsage = [
  {
    date:"2 Jun",
    routerInstalled:5,
    wireUsed:75
  },
  {
    date:"3 Jun",
    routerInstalled:8,
    wireUsed:150
  },
  {
    date:"4 Jun",
    routerInstalled:4,
    wireUsed:100
  },
];




export const iptvUsage = [
  {
    value: 2,
    label: "Jun 1",
  },
  {
    value: 5,
    label: "Jun 2",
  },
  {
    value: 3,
    label: "Jun 3",
  },
  {
    value: 7,
    label: "Jun 4",
  },
  {
    value: 4,
    label: "Jun 5",
  },
  {
    value: 9,
    label: "Jun 6",
  },
  {
    value: 6,
    label: "Jun 7",
  },
];




export const DATA: Record<string, string[]> = {
  Router: ["Single Band", "Dual Band", "REF"],
  IPTV: ["IPTV", "IPTV REF"],
  Wire: ["50M", "75M", "100M", "175M", "200M", "250M", "300M"],
};

/* icon mapping */
export const CATEGORY_ICON: any = {
  Router: Wifi,
  IPTV: Tv,
  Wire: Cable,
};




export const CONSUMPTION_TYPES = [
  "IST",
  "OST",
  "Field Visit",
  "Stock Management",
  "Wire Management",
];
