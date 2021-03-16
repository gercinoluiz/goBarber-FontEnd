import React from 'react'
import { Section, Header, Appointment, Container, HeaderContent, Profile, Content, Schedule, Calendar, NextAppointment } from './styles'
import logoImg from '../../assets/logo.png'
import { useAuth } from '../../hooks/auth'
import { FiClock, FiPower } from 'react-icons/fi'
import { useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useCallback, useEffect, useMemo } from 'react';
import api from '../../services/api';
import { format, isAfter, isToday } from 'date-fns'
import { ptBR } from 'date-fns/esm/locale'
import { parseISO } from 'date-fns/esm'
import { Link } from 'react-router-dom';



interface MonthAvailabilityItem {
    day: number;
    available: boolean;
}

interface Appointments {
    id: string;
    date: string;
    user: {
        name: string;
        avatar_url: string;
    };
}



const Dashboard: React.FC = () => {

    const { signOut, user } = useAuth()
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([])


    const [appointments, setAppointments] = useState<Appointments[]>([]);


    const handleChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available && !modifiers.disabled) {
            setSelectedDate(day)
        }
    }, [])

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month)

    }, [])

    useEffect(() => {

        api.get(`/providers/${user.id}/month-availability`, {
            params: {
                year: currentMonth.getFullYear(),
                month: currentMonth.getMonth() + 1,
            }
        }).then(response => {
            setMonthAvailability(response.data)
        })

    }, [currentMonth, user.id])

    const disabledDays = useMemo(() => {
        const dates = monthAvailability.filter(monthDay => monthDay.available === false).map(monthDay => {
            const year = currentMonth.getFullYear()
            const month = currentMonth.getMonth()

            return new Date(year, month, monthDay.day)
        })

        return dates
    }, [currentMonth, monthAvailability])

    useEffect(() => {

        api.get<Appointments[]>(`/appointments/me`, {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate(),
            }
        }).then(response => {
            console.log({ response })
            setAppointments(response.data)

        })

    }, [selectedDate])

    const selectedDatAsText = useMemo(() => {
        return format(selectedDate, "'Dia' dd 'de' MMMM", {
            locale: ptBR
        })
    }, [selectedDate])


    const selectedWeekDay = useMemo(() => {
        return format(selectedDate, 'cccc', {
            locale: ptBR
        })
    }, [selectedDate])



    const morningAppointments = useMemo(() => {

        return appointments.filter(appointment => {
            return parseISO(appointment.date).getHours() < 12
        })


    }, [appointments])

    const afternoonAppointments = useMemo(() => {

        console.log({ appointments })

        return appointments.filter(appointment => {
            return parseISO(appointment.date).getHours() >= 12
        })

    }, [appointments])

    const nextAppointment = useMemo(() => {
        return appointments.find(appointment => isAfter(parseISO(appointment.date), new Date()))
    }, [appointments])

    const formatHour = useCallback((date: string): string => {

        return format(parseISO(date), 'HH:mm')

    }, [])

    return (

        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt='You Barber' />

                    <Profile>
                        <img src={user.avatar_url} alt={user.name} />

                        <div>
                            <span>Bem vindo,</span>
                            <Link to="/profile">
                                <strong>{user.name}</strong>
                            </Link>
                        </div>
                    </Profile>
                    <button type='button' onClick={signOut}><FiPower /></button>
                </HeaderContent>
            </Header>

            <Content>
                <Schedule>
                    <h1>Horários agendados</h1>
                    <p>
                        {isToday(selectedDate) && <span>Hoje</span>}
                        <span>{selectedDatAsText}</span>
                        <span>{selectedWeekDay}</span>
                    </p>
                    {isToday(selectedDate) && nextAppointment && (

                        <NextAppointment>
                            <strong>Atendimento a seguir</strong>
                            <div>
                                <img src={nextAppointment.user.avatar_url} alt={nextAppointment.user.name} />

                                <strong>{nextAppointment.user.name}</strong>
                                <span>
                                    <FiClock />
                                    {formatHour(nextAppointment.date)}
                                </span>
                            </div>
                        </NextAppointment>
                    )}

                    <Section>
                        <strong>Manhã</strong>
                        {morningAppointments.length === 0 && (
                            <p>Nenhum agendamento neste período</p>
                        )}


                        {console.log({ morningAppointments })}
                        {morningAppointments.map(appoitment => {

                            console.log({ appoitment })

                            return (

                                <Appointment key={appoitment.id}> 
                                    <span>
                                        <FiClock />
                                        {formatHour(appoitment.date)}
                                    </span>

                                    <div>
                                        <img src={appoitment.user ? appoitment.user.avatar_url : ''} alt={appoitment.user ? appoitment.user.name : ''} />

                                        <strong>{appoitment.user ? appoitment.user.name : ''}</strong>
                                    </div>
                                </Appointment>
                            )
                        })}



                    </Section>

                    <Section>
                        <strong>Tarde</strong>

                        {afternoonAppointments.length === 0 && (
                            <p>Nenhum agendamento neste período</p>
                        )}
                        {afternoonAppointments.map(appoitment => {

                            return (

                                <Appointment key={appoitment.id} >
                                    <span>
                                        <FiClock />
                                        {formatHour(appoitment.date)}
                                    </span>

                                    <div>
                                        <img src={appoitment.user ? appoitment.user.avatar_url : ''} alt={appoitment.user ? appoitment.user.name : ''} />

                                        <strong>{appoitment.user ? appoitment.user.name : ''}</strong>
                                    </div>
                                </Appointment>
                            )
                        })}

                    </Section>
                </Schedule>
                <Calendar >

                    <DayPicker
                        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                        fromMonth={new Date()}
                        disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5] },
                        }}

                        onDayClick={handleChange}
                        onMonthChange={handleMonthChange}
                        selectedDays={selectedDate}
                        months={[
                            'Janeiro',
                            'Fevereiro',
                            'Março',
                            'Abril',
                            'Maio',
                            'Junho',
                            'Julho',
                            'Agosto',
                            'Setembro',
                            'Outubro',
                            'Novembro',
                            'Dezembro',
                        ]}

                    />

                </Calendar>

            </Content>

        </Container>

    )
}


export default Dashboard