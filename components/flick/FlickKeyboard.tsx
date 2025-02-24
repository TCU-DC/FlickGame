"use client";

import React, { useState } from "react";
import { useSwipeable, SwipeableHandlers } from "react-swipeable";
import {
  flickHiraganaKeyData,
  hiraganaSwitchList,
} from "@/components/flick/flickKeyData";

// ボタンコンポーネント（フリックのみ）
const HiraganaKeyButton: React.FC<{
  children?: React.ReactNode;
  kana: string;
  handleKeyInput: Function;
}> = ({ children, kana, handleKeyInput }) => {
  // フラグの初期化
  const [isSwipingRight, setIsSwipingRight] = useState<boolean>(false);
  const [isSwipingLeft, setIsSwipingLeft] = useState<boolean>(false);
  const [isSwipingUp, setIsSwipingUp] = useState<boolean>(false);
  const [isSwipingDown, setIsSwipingDown] = useState<boolean>(false);
  const flickHiraganaKeyDataRight = flickHiraganaKeyData[kana].Right;
  const flickHiraganaKeyDataLeft = flickHiraganaKeyData[kana].Left;
  const flickHiraganaKeyDataUp = flickHiraganaKeyData[kana].Up;
  const flickHiraganaKeyDataDown = flickHiraganaKeyData[kana].Down;
  // スワイプ時のイベントハンドラ
  const handlers: SwipeableHandlers = useSwipeable({
    onSwiped: (eventData) => {
      handleKeyInput(flickHiraganaKeyData[kana][eventData.dir]);
    },
    onTap: () => {
      handleKeyInput(kana);
    },
    onSwiping: (eventData) => {
      // スワイプ方向にかな表示を行うためのフラグを設定
      setIsSwipingRight(eventData.dir === "Right");
      setIsSwipingLeft(eventData.dir === "Left");
      setIsSwipingUp(eventData.dir === "Up");
      setIsSwipingDown(eventData.dir === "Down");
    },
    onTouchEndOrOnMouseUp: () => {
      // スワイプ終了時にフラグをリセット
      setIsSwipingRight(false);
      setIsSwipingLeft(false);
      setIsSwipingUp(false);
      setIsSwipingDown(false);
    },
    // スワイプ中のスクロールを防止
    preventScrollOnSwipe: true,
    // タッチ入力の追跡（主にスマホ）
    trackTouch: true,
    // マウス入力の追跡（主にPC）
    trackMouse: true,
  });
  return (
    // フリックボタン
    <button
      {...handlers}
      className="m-0.5 w-1/5 h-14 flex-1 inline-flex items-center justify-center text-lg font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:bg-gray-500 disabled:text-white disabled:pointer-events-none"
    >
      {children}
      {
        // 右にスワイプしている場合、右にかな表示を行う
        isSwipingRight && flickHiraganaKeyDataRight && (
          <div className="absolute bg-gray-200 text-gray-800 py-2 px-3 rounded-lg ml-20">
            {flickHiraganaKeyDataRight}
          </div>
        )
      }
      {
        // 左にスワイプしている場合、左にかな表示を行う
        isSwipingLeft && flickHiraganaKeyDataLeft && (
          <div className="absolute bg-gray-200 text-gray-800 py-2 px-3 rounded-lg -ml-20">
            {flickHiraganaKeyDataLeft}
          </div>
        )
      }
      {
        // 上にスワイプしている場合、上にかな表示を行う
        isSwipingUp && flickHiraganaKeyDataUp && (
          <div className="absolute bg-gray-200 text-gray-800 py-2 px-3 rounded-lg mb-20">
            {flickHiraganaKeyDataUp}
          </div>
        )
      }
      {
        // 下にスワイプしている場合、下にかな表示を行う
        isSwipingDown && flickHiraganaKeyDataDown && (
          <div className="absolute bg-gray-200 text-gray-800 py-2 px-3 rounded-lg mt-20">
            {flickHiraganaKeyDataDown}
          </div>
        )
      }
    </button>
  );
};

// ボタンコンポーネント（フリック以外）
const KeyButton: React.FC<{
  children?: React.ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
}> = ({ children, isDisabled = false, onClick }): JSX.Element => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className="m-0.5  w-1/5 h-14 flex-1 inline-flex items-center justify-center text-lg font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:bg-gray-500 disabled:text-white disabled:pointer-events-none"
    >
      {children}
    </button>
  );
};

// フリック入力コンポーネント
const FlickKeyboard: React.FC<{
  userInput: string;
  handleSetUserInput: Function;
}> = ({ userInput, handleSetUserInput }) => {
  const keys: string[] = Object.keys(flickHiraganaKeyData);
  const handleKeyInput = (input: string): void => {
    handleSetUserInput(`${userInput}${input}`);
  };
  const deleteText = (): void => {
    handleSetUserInput(userInput.slice(0, -1));
  };
  const switchLetter = (): void => {
    const lastLetter = userInput.slice(-1);
    // hiraganaSwitchList の中から lastLetter を検索し、位置を取得
    let index: number = 0;
    let notFound: boolean = true;
    for (let i = 0; i < hiraganaSwitchList.length; i++) {
      if (hiraganaSwitchList[i].includes(lastLetter)) {
        index = i;
        notFound = false;
        break;
      }
    }
    if (!notFound) {
      // 位置を元に二次元配列の中の次の文字を取得
      const nextLetter =
        hiraganaSwitchList[index][
          (hiraganaSwitchList[index].indexOf(lastLetter) + 1) %
            hiraganaSwitchList[index].length
        ];
      handleSetUserInput(`${userInput.slice(0, -1)}${nextLetter}`);
    }
  };

  return (
    <section className="bottom-0">
      <div className="flex">
        <KeyButton isDisabled={true} />
        <HiraganaKeyButton kana={keys[0]} handleKeyInput={handleKeyInput}>
          {keys[0]}
        </HiraganaKeyButton>
        <HiraganaKeyButton kana={keys[1]} handleKeyInput={handleKeyInput}>
          {keys[1]}
        </HiraganaKeyButton>
        <HiraganaKeyButton kana={keys[2]} handleKeyInput={handleKeyInput}>
          {keys[2]}
        </HiraganaKeyButton>
        <KeyButton onClick={deleteText}>del</KeyButton>
      </div>
      <div className="flex">
        <KeyButton isDisabled={true} />
        <HiraganaKeyButton kana={keys[3]} handleKeyInput={handleKeyInput}>
          {keys[3]}
        </HiraganaKeyButton>
        <HiraganaKeyButton kana={keys[4]} handleKeyInput={handleKeyInput}>
          {keys[4]}
        </HiraganaKeyButton>
        <HiraganaKeyButton kana={keys[5]} handleKeyInput={handleKeyInput}>
          {keys[5]}
        </HiraganaKeyButton>
        <KeyButton isDisabled={true} />
      </div>
      <div className="flex">
        <KeyButton isDisabled={true} />
        <HiraganaKeyButton kana={keys[6]} handleKeyInput={handleKeyInput}>
          {keys[6]}
        </HiraganaKeyButton>
        <HiraganaKeyButton kana={keys[7]} handleKeyInput={handleKeyInput}>
          {keys[7]}
        </HiraganaKeyButton>
        <HiraganaKeyButton kana={keys[8]} handleKeyInput={handleKeyInput}>
          {keys[8]}
        </HiraganaKeyButton>
        <KeyButton isDisabled={true} />
      </div>
      <div className="flex">
        <KeyButton isDisabled={true} />
        <KeyButton onClick={switchLetter}>小ﾞﾟ</KeyButton>
        <HiraganaKeyButton kana={keys[9]} handleKeyInput={handleKeyInput}>
          {keys[9]}_
        </HiraganaKeyButton>
        <HiraganaKeyButton kana={keys[10]} handleKeyInput={handleKeyInput}>
          ､｡?!
        </HiraganaKeyButton>
        <KeyButton isDisabled={true} />
      </div>
    </section>
  );
};

export default FlickKeyboard;
