import {render,screen, cleanup, fireEvent} from '@testing-library/react';
import MapButtons from '../../components/MapButtons';


test("testing if the MapButton component is able to call functions passed to it as props", ()=>{

    const mockFN = jest.fn();
    const mockFN2 = jest.fn();
    const mockFN3 = jest.fn();

    render(<MapButtons activation = {mockFN} testProp2 = {mockFN2} testProp3 = {mockFN3}></MapButtons>);
    const button = screen.getByRole('button', {name: 'Center Map'});

    fireEvent.click(button);

    expect(mockFN).toBeCalled();
    
})