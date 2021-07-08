import Title from "../Generic-Components/Title";
import { Button } from "react-bootstrap";

/**
 * A clue/hint item render for the summary page.
 * Used to map a list of clues to multiple renders to display a list on the summary page.
 * 
 * @params the desired clue to display
 * @returns JSX elements
 */
const ClueItem = ({clue}) => {
  return (
    <div style={{margin: "10px", marginBottom: "20px", borderBottom: "1px solid black", }}>
      <p><b>Clue #{clue.order_num}: </b> {clue.clue} </p>
      <p><b>Hint #{clue.order_num}: </b> {clue.hint} </p>
    </div>
  )
  
}

/**
 * Displays the created-game information with most of the relevant user inputs.
 * 
 * 
 */
const Summary = (props) => {

  const ClueList = (list) => {
    return <div style={{backgroundColor: "#F7F7FF", color: "#577399", }}>
    <h3 style={{margin: "10px", }}>Clues and Hints</h3>
    {list.map((item) => {
      return <ClueItem clue={item} />
    })}
    </div>
  }

  return(
    <div className="container">
      <Title title="summary" description="SUMMARY" />
      <p><b>Game Name:</b> {props.detail.name}</p>
      {/* <p>Game Code: {fillerCode}</p> */}
      {/* <p>Hint: {props.location.state.hint}</p> */}
      {/* <p>Challenger(s): {props.location.state.friend}</p> */}
      <p><b>Boundary Radius:</b> {props.bound}</p>
      <p><b>Time Limit:</b> {props.detail.time}(mins)</p>
      {ClueList(props.clues)}
      {/* <Button variant="success" onClick={() => } >Click here to copy the invite link!</Button> */}
    </div>
  )
}

export default Summary;