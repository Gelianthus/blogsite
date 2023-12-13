import Footer from "../components/footer/Footer";
import HeaderComponent from "@/components/header/HeaderComponent";
import MainComponent from "@/components/main/MainComponent";

async function HomePage() {
	return (
		<div className="flex flex-col min-h-screen">
			<HeaderComponent />
			<MainComponent />
			<Footer />
		</div>
	);
}

export default HomePage;
