import { useEffect, useState } from "react";


const PokemonModal = ({ pokemon, onClose }) => {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        if (pokemon) {
            setDetails(pokemon);
        }
    }, [pokemon]);

    if (!pokemon) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

            <div className="bg-white rounded-2xl p-6 w-80 relative animate-scaleIn">


                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-xl"
                >
                    ❌
                </button>

                {!details ? (
                    <div className="flex flex-col items-center justify-center h-40 gap-3">
                        <div className="w-10 h-10 border-4 border-yellow-400 border-t-red-500 rounded-full animate-spin"></div>
                        <p className="text-blue-600 font-semibold">Loading details...</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-center capitalize">
                            {details.name}
                        </h2>

                        <img
                            src={details.sprites.front_default}
                            alt={details.name}
                            className="mx-auto w-32 h-32"
                        />

                        <div className="mt-4">
                            <p><b>HP:</b> {details.stats[0].base_stat}</p>
                            <p><b>Attack:</b> {details.stats[1].base_stat}</p>
                            <p><b>Defense:</b> {details.stats[2].base_stat}</p>
                        </div>

                        <div className="mt-3">
                            <p className="font-semibold">Abilities:</p>
                            {details.abilities.map((a, i) => (
                                <span key={i} className="inline-block bg-yellow-200 px-2 py-1 m-1 rounded">
                                    {a.ability.name}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PokemonModal;