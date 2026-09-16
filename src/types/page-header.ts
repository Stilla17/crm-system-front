export type PageHeaderContent = {
  title: string;
  description: string;
};

export type PageHeaderMap = Record<string, PageHeaderContent>;

export type PageHeaderProps = PageHeaderContent & {
  onCsvClick?: () => void;
  onSaveClick?: () => void;
};
