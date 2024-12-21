export default function HeroHeader() {
    const owner = "Sebastian Młyński";
    const companyName = "Usługi Remontowo-Budowlane";

    return (
        <div class='component-container'>
            <img src='/images/hero-image.png' alt="Hero" class='hero-mage' />
            <div class='hero-overlay'></div>
            <h1 class='hero-text'>{owner}</h1>
            <h2 class='sub-text'>{companyName}</h2>
        </div>
    )
}