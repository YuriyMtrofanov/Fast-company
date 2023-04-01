export function convertDate(createdAt) {
    const dateNow = new Date();
    const created = new Date(parseInt(createdAt));
    const difference = new Date().getTime() - createdAt;
    if (dateNow.getFullYear() - created.getFullYear() > 1) return `- ${created.getDate()} ${created.toLocaleDateString("en-US", { month: "long" })} ${created.getFullYear()}`;
    if (difference > 86400000 && difference <= 31536000000) return `- ${created.getDate()} ${created.toLocaleDateString("en-US", { month: "long" })}`;
    if (difference > 1800000 && difference <= 86400000) return `- ${created.getHours()}:${created.getMinutes()}`;
    if (difference > 600000 && difference <= 1800000) return "- 30 минут назад";
    if (difference > 300000 && difference <= 600000) return "- 10 минут назад";
    if (difference > 60000 && difference <= 300000) return "- 5 минут назад";
    if (difference <= 60000) return "- 1 минуту назад";
};
// Решение Василия
// export function convertDate(createdAt) {
//     const dateNow = new Date();
//     const date = new Date(parseInt(createdAt));
//     const yearDif = dateNow.getFullYear() - date.getFullYear();
//     if (yearDif === 0) {
//         const dayDif = dateNow.getDay() - date.getDay();
//         if (dayDif === 0) {
//             const hourDif = dateNow.getHours() - date.getHours();
//             if (hourDif === 0) {
//                 const minutesDif = dateNow.getMinutes() - date.getMinutes();
//                 if (minutesDif >= 0 && minutesDif < 5) return "1 минуту назад";
//                 if (minutesDif >= 5 && minutesDif < 10) return "5 минут назад";
//                 if (minutesDif >= 10 && minutesDif < 30) {
//                     return "10 минут назад";
//                 }
//                 return "30 минут назад";
//             }
//             return `${date.getHours()}:${date.getMinutes()}`;
//         }
//         return `${date.getDay()} ${date.toLocaleDateString("default", { month: "long" })}`;
//     }
//     return (
//         date.getFullYear() + "." + (date.getMonth() + 1) + "_" + date.getDate()
//     );
// };
