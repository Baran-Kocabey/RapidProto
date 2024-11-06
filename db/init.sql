create table if not exists public.appointments_entity
(
  assignment     varchar not null,
  branch         varchar not null,
  date           varchar not null,
  id             serial
  constraint "PK_8736ebfed4d8236b8a9bd2fa153"
  primary key,
  status         varchar not null,
  time           varchar not null,
  "vehicleOwner" varchar not null,
  "vehicleRegNo" varchar not null,
  userId       integer not null
);

alter table public.appointments_entity
  owner to postgres;

INSERT INTO appointments_entity (assignment, branch, date, id, status, time, "vehicleOwner", "vehicleRegNo", userId)
VALUES ('000-000-01', 'Dortmund', '2023-03-15', 1, 'Reparatur', '07:00', 'Sascha', 'ES-WW-01');
INSERT INTO appointments_entity (assignment, branch, date, id, status, time, "vehicleOwner", "vehicleRegNo", userId)
VALUES ('000-000-02', 'Berlin', '2023-03-15', 2, 'Abholung', '08:00', 'Tobi', 'B-WW-23');