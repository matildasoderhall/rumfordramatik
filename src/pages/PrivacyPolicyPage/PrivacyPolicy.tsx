import styles from './PrivacyPolicy.module.scss';
import classNames from 'classnames';

export const PrivacyPolicyPage = () => {
  return (
    <div className={classNames(styles.privacyPolicyPage)}>
      <h1>Integritetspolicy</h1>
      <span className={styles.lastUpdated}>Senast uppdaterad: 2026-01-27</span>

      <p>
        Din integritet är viktig för oss på Rum för dramatik. Denna policy
        förklarar hur vi samlar in, använder och skyddar dina personuppgifter
        när du besöker vår hemsida, prenumererar på vårt nyhetsbrev, handlar av
        oss eller besöker våra evenemang.
      </p>

      <section>
        <h2>1. Personuppgiftsansvarig</h2>
        <p>
          Rum för dramatik drivs för närvarande som en fristående, ideell
          redaktion och kulturgrupp. Redaktionen ansvarar gemensamt för
          behandlingen av dina personuppgifter.
        </p>
        <ul>
          <li>
            <strong>Verksamhet:</strong> Tidskriften Rum för dramatik (Ideell
            redaktion)
          </li>
          <li>
            <strong>Kontaktperson:</strong> Klara Asta Kirk
          </li>
          <li>
            <strong>E-post:</strong> info@rumfordramatik.se
          </li>
        </ul>
      </section>

      <section>
        <h2>2. Vilka uppgifter samlar vi in och varför?</h2>
        <p>Vi behandlar personuppgifter i följande situationer:</p>

        <h3>A. När du beställer tidskriften</h3>
        <ul>
          <li>
            <strong>Vad:</strong> Namn, adress, e-post, telefonnummer och
            betalningsinformation.
          </li>
          <li>
            <strong>Varför:</strong> För att kunna leverera tidskriften till dig
            och hantera din betalning.
          </li>
          <li>
            <strong>Laglig grund:</strong> <em>Fullgörande av avtal</em> (vi
            måste ha uppgifterna för att leverera varan).
          </li>
          <li>
            <strong>Lagring:</strong> Enligt Bokföringslagen sparas underlag för
            köp i 7 år.
          </li>
        </ul>

        <h3>B. När du prenumererar på nyhetsbrevet</h3>
        <ul>
          <li>
            <strong>Vad:</strong> E-postadress.
          </li>
          <li>
            <strong>Varför:</strong> För att skicka nyheter, inbjudningar till
            event och information om nya nummer.
          </li>
          <li>
            <strong>Laglig grund:</strong> <em>Samtycke</em> (du väljer själv
            att skriva upp dig).
          </li>
          <li>
            <strong>Lagring:</strong> Tills du väljer att avregistrera dig
            (vilket du kan göra i varje utskick).
          </li>
        </ul>

        <h3>C. Vid Open Calls och ansökningar</h3>
        <ul>
          <li>
            <strong>Vad:</strong> Namn, kontaktuppgifter samt
            manus/arbetsprover.
          </li>
          <li>
            <strong>Varför:</strong> För att kunna administrera och göra urval
            till tidskriften eller projekt.
          </li>
          <li>
            <strong>Laglig grund:</strong> <em>Intresseavvägning</em> (för att
            vi ska kunna bedöma din ansökan).
          </li>
        </ul>

        <h3>D. Vid evenemang (Foton och mingelbilder)</h3>
        <ul>
          <li>
            <strong>Vad:</strong> Fotografier och filmklipp där besökare kan
            synas.
          </li>
          <li>
            <strong>Varför:</strong> För att dokumentera vår verksamhet och
            marknadsföra Rum för dramatik i våra kanaler (hemsida, sociala
            medier).
          </li>
          <li>
            <strong>Laglig grund:</strong> <em>Intresseavvägning</em>. Vi
            bedömer att vi har ett berättigat intresse av att dokumentera våra
            offentliga kulturevenemang. Om du vill att en bild på dig ska tas
            bort, kontakta oss.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Vem delar vi uppgifterna med?</h2>
        <p>
          Vi säljer aldrig dina uppgifter vidare. Däremot kan vi behöva dela dem
          med leverantörer som hjälper oss att driva verksamheten, så kallade
          personuppgiftsbiträden:
        </p>
        <ul>
          <li>
            <strong>IT-leverantörer:</strong> För drift av hemsida och e-post.
          </li>
          <li>
            <strong>Betaltjänster:</strong> (T.ex. Swish) för att genomföra
            betalningar.
          </li>
          <li>
            <strong>Logistik:</strong> (T.ex. PostNord) om vi skickar fysiska
            tidskrifter.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Dina rättigheter</h2>
        <p>
          Enligt GDPR har du flera rättigheter rörande dina personuppgifter:
        </p>
        <ul>
          <li>
            <strong>Rätt till tillgång:</strong> Du kan be om att få veta vilka
            uppgifter vi har om dig.
          </li>
          <li>
            <strong>Rätt till rättelse:</strong> Om något är fel har du rätt att
            få det ändrat.
          </li>
          <li>
            <strong>Rätt till radering:</strong> Du kan be oss radera dina
            uppgifter (t.ex. om du inte längre vill ha nyhetsbrevet), förutsatt
            att vi inte måste spara dem enligt lag (t.ex. bokföringslagen).
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Kontakta oss</h2>
        <p>
          Om du har frågor om hur vi hanterar dina personuppgifter eller vill
          utöva dina rättigheter, kontakta oss på:
        </p>
        <p>
          <strong>E-post:</strong>{' '}
          <a href="mailto:info@rumfordramatik.se">info@rumfordramatik.se</a>
        </p>
      </section>
    </div>
  );
};
