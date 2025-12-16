
export interface IToolDetailProps {
  textButtonNew?: string;
  viewButtonNew?: boolean;
  viewButtonBack?: boolean;
  viewButtonDelete?: boolean;
  viewButtonSave?: boolean;
  viewButtonSaveAndBack?: boolean;

  viewButtonNewLoad?: boolean;
  viewButtonBackLoad?: boolean;
  viewButtonDeleteLoad?: boolean;
  viewButtonSaveLoad?: boolean;
  viewButtonSaveAndBackLoad?: boolean;

  onClickNew?: () => void;
  onClickBack?: () => void;
  onClickDelete?: () => void;
  onClickSave?: () => void;
  onClickSaveAndBack?: () => void;
  disabled: boolean;
}
