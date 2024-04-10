import { authorize, getGame, deleteUserFromGame, startGame } from "../api";
import { GameSchema } from "../model";
import { z } from "zod";
import { useEffect, useState } from "react";

type Game = z.infer<typeof GameSchema>;

const GameComponent = (props: {
  gameId: number;
  loggedInUsername: string;
  backToMain: () => void;
}) => {
  const { gameId, loggedInUsername, backToMain } = props;

  const [game, setGame] = useState<Game | null>(null);
  /*   const [startTheGame, setStartTheGame] = useState(false); */

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const response = await getGame(gameId);
      if (!response.success) return;
      setGame(response.data);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [gameId]);

  const addPlayer = async (playerId: number) => {
    await authorize(gameId, playerId);
  };

  const deletePlayer = async (username: string) => {
    await deleteUserFromGame(gameId, username);
  };

  const initGame = async () => {
    await startGame(gameId);
  };

  return (
    <>
      <div>
        {!game && (
          <div className="flex justify-center">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        )}

        {game && !game.hasStarted && (
          <div className="flex flex-col items-center py-16">
            <div className="card bg-secondary text-secondary-content w-[300px] pb-8">
              {game.joinedUsers.length > 7 ||
                game.joinedUsers.length < 4 ||
                (loggedInUsername !== game.admin && (
                  <div className="flex justify-center my-8">
                    <div className="loading loading-spinner loading-lg"></div>
                  </div>
                ))}
              {game.joinedUsers.length <= 7 &&
                game.joinedUsers.length >= 4 &&
                loggedInUsername === game.admin && (
                  <div className="flex justify-center my-8">
                    <button
                      onClick={() => initGame()}
                      className="btn btn-primary"
                    >
                      Start Game
                    </button>
                  </div>
                )}
              <div className="divider">Joined players</div>
              {game.joinedUsers.map((user, index) => (
                <div
                  key={index}
                  className="p-2 my-2 mx-3 rounded-sm bg-primary text-primary-content font-bold flex justify-between items-center"
                >
                  {user.name}
                  {loggedInUsername === game.admin &&
                    loggedInUsername !== user.name && (
                      <button
                        onClick={() => deletePlayer(user.name)}
                        className="btn btn-sm"
                      >
                        Kick
                      </button>
                    )}
                  {loggedInUsername === user.name && (
                    <button
                      onClick={() => deletePlayer(user.name)}
                      className="btn btn-sm"
                    >
                      Leave
                    </button>
                  )}
                </div>
              ))}
              <div className="divider">Waiting in lobby...</div>
              {game.requests.map((user, index) => (
                <div
                  key={index}
                  className="p-2 my-2 mx-3 rounded-sm bg-primary text-primary-content font-bold flex justify-between items-center"
                >
                  <span>{user.name}</span>
                  {loggedInUsername === game.admin && (
                    <button
                      onClick={() => addPlayer(user.id)}
                      className="btn btn-sm"
                    >
                      Add
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="divider"></div>
            <button onClick={backToMain} className="btn btn-error">
              Back to main menu
            </button>
          </div>
        )}
      </div>

      {game && game.hasStarted && (
        <div className="flex gap-4 flex-wrap">
          {game.players.map((player) => (
            <div
              key={player.name}
              className="card card-body bg-neutral text-neutral-content"
            >
              <p>{player.character.name}</p>
              {player.role.name === "Sheriff" ||
                (player.name === loggedInUsername && <p>{player.role.name}</p>)}
              {player.role.name !== "Sheriff" &&
                player.name !== loggedInUsername && <p>*****</p>}
              <p>{player.life}</p>
              <div className="divider">Cards</div>
              {player.cardsInHand.map((card, index) => (
                <p key={index}>
                  {player.name === loggedInUsername && (
                    <span>{card.title}</span>
                  )}
                  {player.name !== loggedInUsername && <span>*****</span>}
                </p>
              ))}
            </div>
          ))}
          <div></div>
        </div>
      )}
    </>
  );
};

export default GameComponent;
