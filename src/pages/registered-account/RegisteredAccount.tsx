import TableContentAccounts from "@/components/registered-accounts/TableContentAccounts";

const RegisteredAccount = () => {
  return (
    <div className="flex flex-col">
      <TableContentAccounts
        selectedOption={{ value: "registered", label: "ثبت نام شده" }}
      />
    </div>
  );
};

export default RegisteredAccount;
