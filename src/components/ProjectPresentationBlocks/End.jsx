export default function End({project, openQuery}) {
    
    const getRightString = () => {
        let num = project.members_goal - project.membersCount;
        let rest = num % 10;
        if (rest == 1 && num != 11) {
            return num + " свободное место";
        }
        else if (rest >=2 && rest <= 4 && num != 12 && num != 13 && num != 14) {
            return num + " свободных места";
        }
        else {
            return num + " свободных мест";
        }
    }

    return (
        <section className="block" style={{textAlign: 'center'}}>
            <h3 className="color-blue">Заинтересовались проектом?</h3>
            <p style={{textAlign: 'center', fontSize: '1.5rem'}}>Подайте заявку! Автор рассмотрит ее и примет решение.</p>
            <p style={{color: 'grey', textAlign: 'center', marginTop: '1rem'}}>В проекте осталось {getRightString()}</p>

            <div class='create_btn' style={{fontSize: '1rem'}}  onClick={() => openQuery(true)}>Подать заявку</div>
        </section>
    );
}