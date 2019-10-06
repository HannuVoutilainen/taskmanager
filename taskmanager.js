            // taulukko johon tehtävät tallennetaan
            let taskItems = [];
            // kaikkien tehtävien yhteiskesto
            let totalTime = 0;
            
            function addTask(title, desc, task_start, task_end) {
                const task = {
                    title,
                    desc,
                    task_start,
                    task_end,
                    id: Date.now(),
                };

                taskItems.push(task);
               
                var start = new Date(task_start).getTime();
                var end = new Date(task_end).getTime();
                //Listataan kaikki taulukossa olevat taskit
                const list = document.querySelector('.js-todo-list');
                list.insertAdjacentHTML('beforeend', `
                <tr data-key="${task.id}">
                  <td>${task.title}</td>
                  <td>${task.desc}</td>
                  <td>${taskDuration(task.task_start, task.task_end)}</td>
                  <td>${new Date(task.task_start).toLocaleDateString("fi-FI")}</td>
                  <td>${new Date(task.task_start).toLocaleDateString("fi-FI")}</td>
                  <td>${new Date(task.task_start).getHours()}:${new Date(task.task_start).getMinutes()}</td>
                  <td>${new Date(task.task_end).getHours()}:${new Date(task.task_end).getMinutes()}</td>
                  <td><button onClick="deleteTask(${task.id}, ${start}, ${end})">Poista</button></td>
                </tr>
              `);
                totalDuration();
            };
            //tehtävien yhteenlasketun keston tulostus
            function totalDuration() {
                var mins = Math.floor(totalTime / 60000);
                var hrs = Math.floor(mins / 60);
                mins = mins % 60;
                document.getElementById("totalDuration").innerHTML = "Total duration: " + hrs + " hours and  " + mins + " minutes";
            }
            //Palauttaa kahden päivämäärän välinen ero
            function taskDuration(task_start, task_end) {
                //aika millisekuntteina
                var date1 = new Date(task_start).getTime();
                var date2 = new Date(task_end).getTime();
                var msec = date2 - date1;
                var mins = Math.floor(msec / 60000);
                var hrs = Math.floor(mins / 60);
                mins = mins % 60;
                return hrs + " h " + mins + " min";
            };

            
            function saveTask() {
                // Luetaan lomakkeelta tulevat tiedot
                var title = document.getElementById("title").value;
                var desc = document.getElementById("desc").value;
                var start_date = document.getElementById("sd").value;
                var start_time = document.getElementById("st").value;
                var end_date = document.getElementById("ed").value;
                var end_time = document.getElementById("et").value;
                // Tietojen testitulostus konsoliin
                var task_start = new Date(start_date + "T" + start_time);
                var task_end = new Date(end_date + "T" + end_time);
                var msec = task_end.getTime() - task_start.getTime();
                document.getElementById("title").value = "";
                document.getElementById("desc").value = "";
                document.getElementById("sd").value = "";
                document.getElementById("st").value = "12:00";
                document.getElementById("ed").value = "";
                document.getElementById("et").value = "12:00";
                if(totalTime == 0) {
                    totalTime = msec;
                } else {
                    totalTime = totalTime + msec;
                }
                addTask(title, desc, task_start, task_end);
                
            }
            // apufunkitiot
            // tehtävän poisto
            function deleteTask(task_id, task_start, task_end) {
                var date1 = new Date(task_start).getTime();
                var date2 = new Date(task_end).getTime();
                var msec = date2 - date1;
                totalTime = totalTime - msec;
                taskItems = taskItems.filter(item => item.id !== Number(task_id));
                const item = document.querySelector(`[data-key='${task_id}']`);
                item.remove();
                totalDuration();
            }
            
            // alkuarvojen nollaus