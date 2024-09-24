import Toast from "./Toast";
import{ render, screen, waitFor } from "@testing-library/react";


const closefunction=jest.fn()
describe('testing toast component',()=>{

    test('checking that the toast component is rendered properly',()=>{
        render(<Toast message='successful' type='success' show={true} onClose={jest.fn()} />)
        const toastMessage=screen.getByText('successful')
        expect(toastMessage).toBeInTheDocument()})
    
    test('checking that the toast component is rendered properly',()=>{
            render(<Toast message='successful' type='success' show={false} onClose={jest.fn()} />) })
})
