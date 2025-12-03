import { useEffect, useState } from "react"
import { supabase } from "@/api/supabaseClient"
import { UserGame } from "./useGame"

export type SelectedType = "bond" | "rating" | "platinum" | "favorite"
export type Bond = 'Beaten' | 'Wishlist' | 'Playing' | 'Dropped'
export type Rating = 'Very Good' | 'Good' | 'Regular' | 'Bad' | 'Very Bad'
export type Sort =  "name_asc" | "name_desc" | "released_asc" | "released_desc" | "created_at_asc" | "created_at_desc"

type Filters = {
    search?: string | null
    bond?: Bond | null
    platinum?: boolean | null
    favorite?: boolean | null
    rating?: Rating | null
    sortBy?: Sort | null
    selectedType?: SelectedType | null
}

type AppUser = {
    id: string;
    name?: string;
    email?: string;
} | null;

export function useGameFilters() {
    const storedSort = typeof window !== "undefined" ? localStorage.getItem("sortBy") : null;

    const [filter, setFilter] = useState<Filters>({sortBy: storedSort ? (storedSort as Sort) : null})
    const [gameList, setGameList] = useState<UserGame []>([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<AppUser>(null)
    const [total, setTotal] = useState(0)
    const [visibleCount, setVisibleCount] = useState(20)

    useEffect(() => {
        if (filter.sortBy) {
            localStorage.setItem("sortBy", filter.sortBy);
        }
    }, [filter.sortBy]);

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser()
            setUser(data?.user ?? null)
        }

        getUser()

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    useEffect(() => {
        const fetchFilteredGames = async () => {
            setLoading(true)

            if (!user) {
                setGameList([]);
                setTotal(0)
                setLoading(false);
                return;
            }
            

            try {
                let query = supabase.from('user_games').select('*').eq("user_id", user.id)
                    .or("bond.not.is.null,rating.not.is.null,favorite.eq.true,platinum.eq.true");

                // search query
                if(filter.search && filter.search.trim() !== ""){
                    query = query.ilike("name", `%${filter.search}%`)
                }

                // bond
                if(filter.selectedType === 'bond' && filter.bond) {
                    query = query.eq("bond", filter.bond)
                }

                // ratings
                if(filter.selectedType === 'rating' && filter.rating) {
                    query = query.eq("rating", filter.rating)
                }

                // platinum
                if(filter.selectedType === 'platinum' && (filter.platinum !== null && filter.platinum !== undefined)) {
                    query = query.eq("platinum", filter.platinum)
                }

                // favorite
                if(filter.selectedType === 'favorite' && (filter.favorite !== null && filter.favorite !== undefined)) {
                    query = query.eq("favorite", filter.favorite)
                }

                // 
                if(!filter.selectedType) {
                    if(filter.bond) query = query.eq('bond', filter.bond)
                    if(filter.rating) query = query.eq('rating', filter.rating)
                    if (filter.platinum !== null && filter.platinum !== undefined) query = query.eq("platinum", filter.platinum);
                    if (filter.favorite !== null && filter.favorite !== undefined) query = query.eq("favorite", filter.favorite);

                }

                // sort
                if (filter.sortBy) {
                    switch (filter.sortBy) {
                        case "name_asc":
                        query = query.order("name", { ascending: true });
                        break;

                        case "name_desc":
                        query = query.order("name", { ascending: false });
                        break;

                        case "released_asc":
                        query = query.order("released", { ascending: true });
                        break;

                        case "released_desc":
                        query = query.order("released", { ascending: false });
                        break;

                        case "created_at_asc":
                        query = query.order("created_at", { ascending: true });
                        break;

                        case "created_at_desc":
                        query = query.order("created_at", { ascending: false });
                        break;

                        default:
                        break;
                    }
                }

                const { data, error} = await query

                if(error || !data) {
                    console.error("Error fetching filtered games", error)
                    setGameList([])
                    setTotal(0);
                    setLoading(false);
                    return;
                }

                setTotal(data.length);

                // PAGINAÇÃO (visibleCount)
                const sliced = data.slice(0, visibleCount);

                setGameList(sliced);
                setLoading(false);
               
            } catch (e) {
                console.error(e);
                setGameList([]);
                setTotal(0)
            }

        }

        fetchFilteredGames()

        console.log(filter)
        // console.log(gameList)

    }, [filter, visibleCount, user])

    return { gameList, loading, filter, setFilter, total, visibleCount, setVisibleCount, user }
    
}

