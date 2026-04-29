import { motion, AnimatePresence } from "framer-motion";

const typeColors = {
  grass: "bg-green-500",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  poison: "bg-purple-500",
  bug: "bg-lime-500",
  normal: "bg-gray-400",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  rock: "bg-yellow-700",
  ground: "bg-amber-600",
  ice: "bg-cyan-300",
  dragon: "bg-indigo-700",
  dark: "bg-gray-700",
  fairy: "bg-pink-300",
  fighting: "bg-red-700",
  ghost: "bg-purple-700",
  steel: "bg-gray-500"
};

const getStatColor = (value) => {
  if (value < 50) return "bg-red-400";
  if (value < 70) return "bg-orange-400";
  if (value < 90) return "bg-yellow-400";
  return "bg-green-500";
};

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalAnim = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 }
};

const PokemonModal = ({ pokemon, onClose }) => {
  return (
    <AnimatePresence>
      {pokemon && (
        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={onClose}
        >
          <motion.div
            variants={modalAnim}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 w-96 shadow-xl relative"
          >
            <button
              className="absolute top-3 right-3 text-xl"
              onClick={onClose}
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-center capitalize">
              {pokemon.name}
            </h2>

            <motion.img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="mx-auto w-32"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
            />

            <div className="flex justify-center gap-2 mt-2">
              {pokemon.types.map((t, index) => (
                <motion.span
                  key={t.type.name}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`px-3 py-1 text-white rounded-full text-sm capitalize ${typeColors[t.type.name]}`}
                >
                  {t.type.name}
                </motion.span>
              ))}
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Base Stats</h3>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="mb-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">
                      {stat.stat.name.replace("-", " ")}
                    </span>
                    <span>{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
                    <motion.div
                      className={`h-2 rounded ${getStatColor(
                        stat.base_stat
                      )}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.base_stat}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PokemonModal;