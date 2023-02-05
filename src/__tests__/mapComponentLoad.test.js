import {render,screen, cleanup} from '@testing-library/react';
import MapDisplay from '../components/MapDisplay';

afterEach(()=>{    
    cleanup();
})

test('should render mapDisplay component', ()=>{
    render(<MapDisplay/>);
    const element = screen.getByTestId('mapDisplay-1');
    //acted/setup
    //assertions
    expect(element).toBeInTheDocument();
})