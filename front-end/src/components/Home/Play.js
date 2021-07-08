import Button from "../Generic-Components/Button";
import PlaceholderImage from "../Generic-Components/Placeholder-Image";
import { Link } from "react-router-dom";

function Play() {
	return (
		<div className="container">
			<PlaceholderImage source="https://dummyimage.com/350x350/000/fff" />
			<Link to="/">
				<Button title="tutorial" description="TUTORIAL" />
			</Link>
			<Link to="/join">
				<Button title="join" description="JOIN GAME" />
			</Link>
			<Link to="/create">
				<Button title="create" description="CREATE GAME" />
			</Link>
		</div>
	);
}

export default Play;
