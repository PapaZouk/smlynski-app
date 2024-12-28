type HeroHeaderProps = {
    companyName: string;
    companySubtitle: string | null;
}

export default function HeroHeader({companyName, companySubtitle}: HeroHeaderProps) {

    return (
        <div class='component-container'>
            <img src='/images/hero-image.png' alt="Hero" class='hero-mage' />
            <div class='hero-overlay'></div>
            <h1 class='hero-text text-4xl'>{companyName}</h1>
            {companySubtitle && <h2 class='sub-text'>{companySubtitle}</h2>}
        </div>
    )
}