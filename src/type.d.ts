type Role = "GOOD_SUPPLIER" | "KOL" | "KAVANI";

interface SelectedOption {
  value: string;
  label: string;
}

type TChildren = {
  children: ReactNode;
};

interface IThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
}

interface AuthContextType {
  auth: IAuth | null;
  setAuth: React.Dispatch<React.SetStateAction<IAuth | null>>;
  persist: boolean;
  setPersist: (value: boolean) => void;
}

interface IAuth {
  user: string;
  pwd: string;
  roles: Role;
  accessToken: string;
}
type TAllowRoles = {
  allowedRoles: Role[];
};

/*=========================================
                                            
              Responses

=========================================*/

type Sort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};

type Pageable = {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

type ResponseBody<T> = {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  empty: boolean;
};

type ResponseData<T> = {
  timestamp: string;
  body: ResponseBody<T>;
  is_successful: boolean;
};

type ResponseDataNoPagination<T> = {
  timestamp: string;
  body: T[];
  is_successful: boolean;
};

type ResponseDataNoArray<T> = {
  timestamp: string;
  body: T;
  is_successful: boolean;
};





type User = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  mobile: string;
  email: string | null;
  national_code: null | string;
  status: string;
  last_login_at: string;
  voucher: string;
};
interface IRegisteredUser {
  id: number
  email?: string
  mobile?: string
  username?: string
  voucher?: string
  serviceName?: string
  isFinal?: boolean
  first_name?: string
  last_name?: string
  national_code: unknown
  status: string
  last_login_at?: string
}

type Transaction = {
  id: number;
  amount: number;
  currency: null;
  status: "created" | "gatewayInit" | "paid" | "reversed" | "success";
  gateway_type: "ezpay";
  created_at: string;
};

type IAutomaticRegistration = {
  keyName: string;
  value: string;
  type: string;
};
type IFieldConfig = {
  fieldName: string;
  readOnly: boolean;
  mandatory: boolean;
  available: boolean;
};

interface IKolGetAll {
  id: number
  officialName: string
  name: string
  address: string
}
interface IServiceAll {
  serviceId: number;
  name: string;
  kolName: string;
  servicePrice: number;
  discount: number;
  kavaniPercentage: number;
  prepayment: number;
}

interface IStatusGoodSupplier{
  supplyCountInKavani: number
  bestSoldSupplyName: string
  soldCount: number
  position: number
}
interface IBestSelling{
    code: string
    name: string
    remainQuantity: number
    sold: number
    total: number
}

interface INotSold{
  code: string
  name: string
  remainingQuantity: number
}
interface IDiversity {
  name: string
  total: number
}

/*=========================================
                                            
              packages

=========================================*/
// interface MyJwtPayload extends JwtPayload {
//   id: string | null;
//   email: string | null;
//   mobile: string | null;
//   roles: Role[];
// }
interface MyJwtPayload extends JwtPayload {
  id: number;
  email: string;
  mobile?: string;
  nationalCode?: string;
  birthDate?: string;
  roles: Role[];
  username: string;
  token_expiration_date: number;
}
