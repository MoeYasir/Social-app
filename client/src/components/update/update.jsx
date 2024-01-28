import { useState } from "react";
import "./update.scss"
import { makeRequest } from "../../axios.js"
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
const Update = ({ setOpenUpdate, user }) => {
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const queryClient = useQueryClient();

    const [texts, setTexts] = useState({
        name: "",
        city: "",
        website: "",
    })
    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        } catch (error) {
            console.log(error);
        }

    }
    const handleChange = (e) => {

        setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
    };

    const mutation = useMutation({
        mutationFn: (user) => {

            return makeRequest.put("/users", user)
        },
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
    })
    const handleClick = async (e) => {
        e.preventDefault();
        let coverUrl = user.coverPic;
        let profileUrl = user.profilePic;

        coverUrl = cover ? await upload(cover) : user.coverPic;
        profileUrl = profile ? await upload(profile) : user.profilePic;
        mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
        setOpenUpdate(false);

    }
    return <div className="update">Update
        <form action="">
            <input type="file" onChange={e => setCover(e.target.files[0])} />
            <input type="file" onChange={e => setProfile(e.target.files[0])} />
            <input type="text" name="name" onChange={handleChange} />
            <input type="text" name="city" onChange={handleChange} />
            <input type="text" name="website" onChange={handleChange} />
            <button onClick={handleClick}>Update</button>

        </form>
        <button onClick={() => setOpenUpdate(false)}>
            X
        </button>    </div>;
}

export default Update;