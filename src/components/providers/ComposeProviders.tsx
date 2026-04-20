import { ReactNode } from "react";

type Props = { children: ReactNode };

export const composeProviders = (
  ...providers: React.ComponentType<Props>[]
) => {
  return ({ children }: Props) => {
    return providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );
  };
};
