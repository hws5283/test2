import {render,screen, cleanup} from '@testing-library/react';
import MapDisplay from '../../components/MapDisplay'


test("buttons for centering and max/min zoom are rendered on mapDisplay load", ()=>{
    render(<MapDisplay/>)
    const element = screen.getByTestId('mapButtons-1');
    expect(element).toBeInTheDocument();
})