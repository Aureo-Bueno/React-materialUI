import { useNavigate, useParams } from "react-router-dom";
import { ToolDetail } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";


export const DetailPerson: React.FC = () => {
    const { id = 'new' } = useParams<'id'>()
    const navigate = useNavigate();

    const handleSave = () => {
        console.log('save');
    };

    const handleDelete = () => {
        console.log('delete');
    };

    return(
        <LayoutBasePage 
          title='Detalhe de Pessoa'
          toolBar={
              <ToolDetail 
                textButtonNew='Nova'
                viewButtonSaveAndBack
                viewButtonNew={id !== 'new'}
                viewButtonDelete={id !== 'new'}

                onClickSave={handleSave}
                onClickSaveAndBack={handleSave}
                onClickDelete={handleDelete}
                onClickBack={() => navigate('/person')}
                onClickNew={() => navigate('/person/detail/new')}
              />
          }
        >
          <p>Detalhes da Pessoa {id}</p>
        </LayoutBasePage>
       
    );
};