import { LinearProgress } from "@mui/material";
import { Form } from "@unform/web";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToolDetail } from "../../shared/components";
import { VTextField } from "../../shared/forms";
import { LayoutBasePage } from "../../shared/layouts";
import { PersonService } from "../../shared/services/api/person/PersonService";


export const DetailPerson: React.FC = () => {
  const { id = 'new' } = useParams<'id'>()
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      PersonService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            navigate('/person');
          } else {
            setName(result.nameComplete);
            console.log(result);
          }
        })
    }
  }, [id]);

  const handleSave = () => {
    console.log('save');
  };

  const handleDelete = (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Realmente deseja apagar?')) {
      PersonService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso');
            navigate('/person');
          }
        });
    }
  }


  return (
    <LayoutBasePage
      title={id === 'new' ? 'Nova Pessoa' : name}
      toolBar={
        <ToolDetail
          textButtonNew='Nova'
          viewButtonSaveAndBack
          viewButtonNew={id !== 'new'}
          viewButtonDelete={id !== 'new'}

          onClickSave={handleSave}
          onClickSaveAndBack={handleSave}
          onClickBack={() => navigate('/person')}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNew={() => navigate('/person/detail/new')}
        />
      }
    >

      <Form onSubmit={(data) => console.log(data)}>

        <VTextField name='nameComplete' />


        <button type='submit'>Submit</button>
      </Form>

    </LayoutBasePage>

  );
};