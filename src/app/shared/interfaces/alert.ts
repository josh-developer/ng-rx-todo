export interface IAlert {
  msg: string;
  type?: "success" | "error" | "info";
}

export enum ALERT {
  Success = "success",
  Error = "error",
  Info = "info",
}

export const TODO_ALERTS = {
  AddSuccessMsg: (title: string) => `${title}'s successfully added!`,
  EditSuccessMsg: (title: string) => `${title}'s successfully edited!`,
  DeleteSuccessMsg: (title: string) => `${title}'s successfully deleted!`,
  ErrorMsg: () => `Something went wrong! Please, retry again.`,
};
