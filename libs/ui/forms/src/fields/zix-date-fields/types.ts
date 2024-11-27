export type ZixDateFieldProps = {
  value?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  hasError?: boolean;
  min_date?: Date;
};
