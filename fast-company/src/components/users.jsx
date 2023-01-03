import React from "react";
import { User } from "./user"

export const Users = ( {users, ...rest} ) => {
  // users передает параметры объекта с данными
  // ...rest передает все обработчикт (onDelete и onBookMark)
  return(
      <>
        {users.length > 0 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Закладки</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <User 
                  key = {user._id}
                  {...user} // на следующий уровень передаю информацию о юзере
                  {...rest} // передаю обработчики событий
                />
              ))}
            </tbody>
          </table>
        )}
      </>
  )
}


