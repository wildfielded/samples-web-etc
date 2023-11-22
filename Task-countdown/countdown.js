let numberMinS = 0;
let numberSecS = 0;

// Функция постоянного вывода текущего состояния значений минут и секунд
const updateFields = () => {
    $('#field-min').text((0 + String(numberMinS)).slice(-2));
    $('#field-sec').text((0 + String(numberSecS)).slice(-2));
}

// Основная функция счётчика
const countDown = () => {
    let timeCan = numberSecS + numberMinS * 60;
    const timeFlow = setTimeout(countDown, 1000);
    // Нажатие на "Pause Countdown" прячет лишние кнопки, показывает нужные,
    // и приостанавливает счётчик без сброса значений минут и секунд.
    $('#but-pause').click(e => {
        $('#but-pause').hide();
        $('#but-resume').show();
        clearTimeout(timeFlow);
    });
    // Остановка счётчика и вывод сообщения
    if (timeCan <= 0) {
        clearTimeout(timeFlow);
        $('#but-pause').hide();
        $('#field-msg').text('Time is up!');
    }
    else {
        if (numberSecS > 0) numberSecS--;
        else {
            numberSecS = 59;
            numberMinS--;
        }
    }
    updateFields();
}

// Изменение минут в плюс по кругу кнопкой со стрелкой
$('#plus-min').click(e => {
    if (numberMinS < 59) ++numberMinS;
    else numberMinS = 0;
    updateFields();
});

// Изменение секунд в плюс по кругу кнопкой со стрелкой
$('#plus-sec').click(e => {
    if (numberSecS < 59) ++numberSecS;
    else {
        numberSecS = 0;
        if (numberMinS < 59) ++numberMinS;
        else numberMinS = 0;
    }
    updateFields();
});

// Изменение минут в минус по кругу кнопкой со стрелкой
$('#minus-min').click(e => {
    if (numberMinS > 0) --numberMinS;
    else numberMinS = 59;
    updateFields();
});

// Изменение секунд в минус по кругу кнопкой со стрелкой
$('#minus-sec').click(e => {
    if (numberMinS === 0 && numberSecS === 0) {
        numberSecS = 60;
        numberMinS = 59;
    }
    if (numberSecS > 0) --numberSecS;
    else {
        numberSecS = 59;
        --numberMinS;
    }
    updateFields();
});

// Нажатие на "Start Countdown" прячет лишние кнопки, показывает нужные
// и запускает счётчик
$('#but-start').click(e => {
    $('#plus-min').hide();
    $('#minus-min').hide();
    $('#plus-sec').hide();
    $('#minus-sec').hide();
    $('#but-start').hide();
    $('#but-pause').show();
    $('#but-stop').show();
    countDown();
});

// Нажатие на "Resume Countdown" прячет лишние кнопки, показывает нужные
// и запускает счётчик, продолжая с текущих значений минут и секунд.
$('#but-resume').click(e => {
    $('#but-pause').show();
    $('#but-resume').hide();
    countDown();
});

// Нажатие на "Stop and/or Reset Countdown" перегружает страницу.
$('#but-stop').click(e => location.reload());

updateFields();
$('#but-pause').hide();
$('#but-resume').hide();
$('#but-stop').hide();
