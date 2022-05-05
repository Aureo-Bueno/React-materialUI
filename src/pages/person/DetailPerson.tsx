import { LinearProgress } from "@mui/material";
import { FormHandles, Scope } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToolDetail } from "../../shared/components";
import { VTextField } from "../../shared/forms";
import { LayoutBasePage } from "../../shared/layouts";
import { IDetailPerson, PersonService } from "../../shared/services/api/person/PersonService";

interface IFormData{
  email: string;
  cityId: string;
  nameComplete: string;
}
export const DetailPerson: React.FC = () => {
  const { id = 'new' } = useParams<'id'>()
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

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

  const handleSave = (data: IFormData) => {
    console.log(data);
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

          onClickSave={() => formRef.current?.submitForm()}
          onClickSaveAndBack={() => formRef.current?.submitForm()}
          onClickBack={() => navigate('/person')}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNew={() => navigate('/person/detail/new')}
        />
      }
    >

      <Form ref={formRef} onSubmit={handleSave}>

        <VTextField name='nameComplete' />
        <VTextField name='email' />
        <VTextField name='cityId' />

        {/* {[1, 2, 3, 4].map((_, index) => (
          <Scope key={} path={`addrees[${index}]`}>
            <VTextField name='street' />
            <VTextField name='number' />
            <VTextField name='state' />
            <VTextField name='city' />
            <VTextField name='country' />
          </Scope>
        ))} */}

      </Form>

    </LayoutBasePage>

  );
};