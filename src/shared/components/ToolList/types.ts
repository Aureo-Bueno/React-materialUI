export interface IToolListProps {
  textSearch?: string;
  viewInputSearch?: boolean;
  alterTextSearch?: (newText: string) => void;
  textButtonNew?: string;
  viewButtonNew?: boolean;
  onClickNew?: () => void;
}
