import {render,screen, cleanup} from '@testing-library/react';
import Input from '../../components/formComponents/Input'

//TESTS THAT THE INPUT COMPONENT WILL DEFAULT TO DISPLAYING THE WARNING TEXT
//SEE USE IN UPDATE COMPONENT

test("does the input component default to displaying the error text?", ()=>{
    render(<Input errorText = "error text test"></Input>)
    const element = screen.getByText('error text test')
    expect(element).toBeInTheDocument();
})