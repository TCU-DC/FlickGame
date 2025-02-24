import styles from "@/styles/game.module.scss";
import Image from "next/image";

export default function Game({
  userInput,
  isCorrect,
}: {
  userInput: string;
  isCorrect: boolean;
}) {
  // 画像や背景を決定するロジック
  const getBackgroundImage = () => {
    if (isCorrect) return "/images/correct.gif";
    return "/images/back.webp";
  };

  const getSamuraiImage = () => {
    if (userInput) return "/images/samurai/samurai-stanby.webp";
    return `/images/samurai/samurai.gif`;
  };

  const getEnemyImage = () => {
    return `/images/enemy/enemy.gif`;
  };

  return (
    <section className={styles.gameUI}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${getBackgroundImage()})` }}
      ></div>
      {!isCorrect && (
        <div className={styles.samurai}>
          <Image
            src={getSamuraiImage()}
            alt="Samurai"
            width={200}
            height={200}
          />
        </div>
      )}
      {!isCorrect && (
        <div className={styles.enemy}>
          <Image src={getEnemyImage()} alt="Enemy" width={200} height={200} />
        </div>
      )}
      {!isCorrect && (
        <div className={styles.kusa}>
          <Image src="/images/leaf.gif" alt="kusa" width={200} height={200} />
        </div>
      )}
    </section>
  );
}
